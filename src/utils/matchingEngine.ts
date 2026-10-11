import { Candidate, MutualMatch, ThreeWayMatch } from '../types';
import { areDistrictsNeighboring } from '../data/biharDistricts';

/**
 * Find 1:1 direct mutual matches for a specific candidate
 */
export function findMatchesForCandidate(
  target: Candidate,
  allCandidates: Candidate[]
): MutualMatch[] {
  const matches: MutualMatch[] = [];
  const targetHome = target.homeDistrict;
  const targetPosting = target.postingDistrict;
  const targetPrefs = target.preferredDistricts || [targetHome];

  // Candidates who are NOT the target
  const others = allCandidates.filter((c) => c.id !== target.id);

  for (const other of others) {
    const otherHome = other.homeDistrict;
    const otherPosting = other.postingDistrict;
    const otherPrefs = other.preferredDistricts || [otherHome];

    // Case 1: Exact 100% Direct Swap
    // Target is posted in Other's home district, AND Other is posted in Target's home district
    if (targetPosting === otherHome && otherPosting === targetHome) {
      matches.push({
        candidateA: target,
        candidateB: other,
        matchType: 'direct',
        matchScore: 100,
        reason: `सटीक 1:1 मैच (Exact Match): आप ${otherHome} में पदस्थापित हैं और ${other.name} ${targetHome} में पदस्थापित हैं।`,
      });
      continue;
    }

    // Case 2: Preferred District Match
    // If target has preferred districts or other has preferred districts
    const targetWantsOtherPosting = targetPrefs.includes(otherPosting);
    const otherWantsTargetPosting = otherPrefs.includes(targetPosting);

    if (targetWantsOtherPosting && otherWantsTargetPosting) {
      matches.push({
        candidateA: target,
        candidateB: other,
        matchType: 'preferred',
        matchScore: 95,
        reason: `पसंदीदा जिला मैच (Preferred Match): आप दोनों की पसंद एक दूसरे के पदस्थापन स्थल से मेल खाती है।`,
      });
      continue;
    }

    // Case 3: Adjacent/Neighboring District Match
    const targetNearHome = areDistrictsNeighboring(otherPosting, targetHome);
    const otherNearHome = areDistrictsNeighboring(targetPosting, otherHome);

    if (
      (otherPosting === targetHome && otherNearHome) ||
      (targetPosting === otherHome && targetNearHome) ||
      (targetNearHome && otherNearHome)
    ) {
      let score = 80;
      let reason = `पड़ोसी जिला मैच (Adjacent District Match): `;
      if (otherPosting === targetHome) {
        score = 90;
        reason += `${other.name} आपके गृह जिला ${targetHome} में हैं, और आप उनके निकटवर्ती जिले ${targetPosting} में हैं।`;
      } else if (targetPosting === otherHome) {
        score = 90;
        reason += `आप उनके गृह जिला ${otherHome} में हैं, और वे आपके निकटवर्ती जिले ${otherPosting} में हैं।`;
      } else {
        score = 80;
        reason += `दोनों एक-दूसरे के निकटवर्ती प्रमंडल/जिले में पदस्थापित हैं।`;
      }

      matches.push({
        candidateA: target,
        candidateB: other,
        matchType: 'adjacent',
        matchScore: score,
        reason,
      });
    }
  }

  // Sort by match score descending
  return matches.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Find all unique 1:1 direct mutual transfer pairs in the whole system
 */
export function findAllMutualPairs(allCandidates: Candidate[]): MutualMatch[] {
  const pairs: MutualMatch[] = [];
  const visited = new Set<string>();

  for (let i = 0; i < allCandidates.length; i++) {
    const cA = allCandidates[i];
    if (visited.has(cA.id)) continue;

    const matches = findMatchesForCandidate(cA, allCandidates);
    for (const match of matches) {
      const cB = match.candidateB;
      const pairKey = [cA.id, cB.id].sort().join(':::');
      if (!visited.has(pairKey)) {
        visited.add(pairKey);
        pairs.push(match);
      }
    }
  }

  return pairs.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Find 3-way triangular transfer chains for a target candidate
 * A -> wants B's post (B is in A's target)
 * B -> wants C's post (C is in B's target)
 * C -> wants A's post (A is in C's target)
 */
export function findThreeWayMatchesForCandidate(
  target: Candidate,
  allCandidates: Candidate[]
): ThreeWayMatch[] {
  const chains: ThreeWayMatch[] = [];
  const A = target;
  const A_wants = A.homeDistrict;
  const A_posted = A.postingDistrict;

  // Find candidate B who is posted in A's desired district (A_wants)
  const candidatesB = allCandidates.filter(
    (b) => b.id !== A.id && b.postingDistrict === A_wants
  );

  for (const B of candidatesB) {
    const B_wants = B.homeDistrict;
    if (B_wants === A_posted) continue; // That's a 2-way direct match, not 3-way!

    // Find candidate C who is posted in B's desired district (B_wants),
    // and whose desired district is A's posting district (A_posted)!
    const candidatesC = allCandidates.filter(
      (c) =>
        c.id !== A.id &&
        c.id !== B.id &&
        c.postingDistrict === B_wants &&
        c.homeDistrict === A_posted
    );

    for (const C of candidatesC) {
      chains.push({
        id: `${A.id}_${B.id}_${C.id}`,
        candidateA: A,
        candidateB: B,
        candidateC: C,
        chainText: `${A.name} (${A_posted} ➔ ${A_wants}) ➔ ${B.name} (${B.postingDistrict} ➔ ${B.homeDistrict}) ➔ ${C.name} (${C.postingDistrict} ➔ ${C.homeDistrict}) ➔ ${A.name}`,
      });
    }
  }

  return chains;
}

/**
 * Find all 3-way chains across the system
 */
export function findAllThreeWayChains(allCandidates: Candidate[]): ThreeWayMatch[] {
  const allChains: ThreeWayMatch[] = [];
  const seenSets = new Set<string>();

  for (const candidate of allCandidates) {
    const candidateChains = findThreeWayMatchesForCandidate(candidate, allCandidates);
    for (const chain of candidateChains) {
      const ids = [chain.candidateA.id, chain.candidateB.id, chain.candidateC.id].sort().join(':::');
      if (!seenSets.has(ids)) {
        seenSets.add(ids);
        allChains.push(chain);
      }
    }
  }

  return allChains;
}

/**
 * Calculate district statistics (Supply vs Demand)
 */
export interface DistrictStat {
  district: string;
  residentsCount: number; // Nurses whose Home District is this
  postedCount: number; // Nurses currently posted in this district
  wantToLeave: number; // Posted here but home district is elsewhere
  wantToCome: number; // Home district is this but posted elsewhere
  alreadyHome: number; // Posted in their own home district
  netPressure: number; // wantToCome - wantToLeave
}

export function calculateDistrictStats(candidates: Candidate[]): DistrictStat[] {
  const statsMap: Record<string, DistrictStat> = {};

  candidates.forEach((c) => {
    // Tally Home District
    if (!statsMap[c.homeDistrict]) {
      statsMap[c.homeDistrict] = {
        district: c.homeDistrict,
        residentsCount: 0,
        postedCount: 0,
        wantToLeave: 0,
        wantToCome: 0,
        alreadyHome: 0,
        netPressure: 0,
      };
    }
    statsMap[c.homeDistrict].residentsCount += 1;

    // Tally Posting District
    if (!statsMap[c.postingDistrict]) {
      statsMap[c.postingDistrict] = {
        district: c.postingDistrict,
        residentsCount: 0,
        postedCount: 0,
        wantToLeave: 0,
        wantToCome: 0,
        alreadyHome: 0,
        netPressure: 0,
      };
    }
    statsMap[c.postingDistrict].postedCount += 1;

    // Check if posted at home or away
    if (c.homeDistrict === c.postingDistrict) {
      statsMap[c.homeDistrict].alreadyHome += 1;
    } else {
      statsMap[c.postingDistrict].wantToLeave += 1;
      statsMap[c.homeDistrict].wantToCome += 1;
    }
  });

  // Calculate net pressure
  Object.values(statsMap).forEach((st) => {
    st.netPressure = st.wantToCome - st.wantToLeave;
  });

  return Object.values(statsMap).sort((a, b) => b.residentsCount - a.residentsCount);
}
