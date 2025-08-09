import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Mock data for development when Supabase is not configured
const mockStats = {
  totalReports: 247,
  verifiedReports: 189,
  totalRewardsDistributed: 4725000, // ₹47,25,000
  pendingReports: 42,
  rejectedReports: 16,
  averageRewardPerReport: 25000,
};

export async function GET() {
  try {
    // Check if environment variables are properly configured
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder') ||
      process.env.SUPABASE_SERVICE_ROLE_KEY.includes('placeholder')
    ) {
      console.log('Using mock data - Supabase not configured');
      return NextResponse.json(mockStats);
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Get all reports to calculate statistics
    const { data: reports, error: reportsError } = await supabase
      .from('defamation_reports')
      .select('status, reward_amount, created_at');

    if (reportsError) {
      console.error('Error fetching reports:', reportsError);
      console.log('Falling back to mock data');
      return NextResponse.json(mockStats);
    }

    // Calculate statistics
    const totalReports = reports.length;
    const verifiedReports = reports.filter(r => r.status === 'verified').length;
    const totalRewardsDistributed = reports
      .filter(r => r.status === 'verified')
      .reduce((sum, r) => sum + r.reward_amount, 0);
    const successRate =
      totalReports > 0 ? Math.round((verifiedReports / totalReports) * 100) : 0;

    // Get this month's reports
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);

    const thisMonthReports = reports.filter(
      r => new Date(r.created_at) >= thisMonth
    ).length;

    return NextResponse.json({
      success: true,
      data: {
        totalReports,
        verifiedReports,
        totalRewardsDistributed,
        successRate,
        thisMonthReports,
        averageProcessingTime: '24-48 hours', // Static for now
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
