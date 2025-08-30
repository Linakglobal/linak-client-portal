// VHSY Coin Types and Interfaces

export interface VHSYCoin {
  symbol: string;
  name: string;
  currentPrice: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  totalSupply: number;
}

export interface VHSYStakingPool {
  id: string;
  name: string;
  apy: number;
  lockPeriod: number; // in days
  minStake: number;
  totalStaked: number;
  isActive: boolean;
}

export interface VHSYTransaction {
  id: string;
  type: 'stake' | 'unstake' | 'reward' | 'transfer' | 'payment';
  amount: number;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed';
  txHash?: string;
}

export interface VHSYWallet {
  address: string;
  balance: number;
  stakedBalance: number;
  pendingRewards: number;
  transactions: VHSYTransaction[];
}

export interface VHSYGovernanceProposal {
  id: string;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  status: 'active' | 'passed' | 'rejected' | 'pending';
  endDate: Date;
  quorum: number;
}

export interface VHSYProperty {
  id: string;
  title: string;
  location: string;
  price: number;
  priceInVHSY: number;
  type: 'residential' | 'commercial' | 'land';
  status: 'available' | 'sold' | 'pending';
  images: string[];
  features: string[];
}

export interface VHSYMerchant {
  id: string;
  name: string;
  category: string;
  location: string;
  acceptsVHSY: boolean;
  cashbackRate: number;
  rating: number;
  description: string;
}

export interface VHSYCharity {
  id: string;
  name: string;
  description: string;
  totalDonated: number;
  donorsCount: number;
  category: string;
  isVerified: boolean;
  impact: string;
}

export interface VHSYEducation {
  id: string;
  institution: string;
  course: string;
  tuition: number;
  tuitionInVHSY: number;
  duration: string;
  location: string;
  acceptsVHSY: boolean;
}

export interface VHSYImmigration {
  id: string;
  country: string;
  visaType: string;
  fee: number;
  feeInVHSY: number;
  processingTime: string;
  requirements: string[];
  acceptsVHSY: boolean;
}

export interface VHSYStats {
  totalUsers: number;
  totalTransactions: number;
  totalValueLocked: number;
  countriesSupported: number;
  merchantPartners: number;
  educationPartners: number;
  charityPartners: number;
}