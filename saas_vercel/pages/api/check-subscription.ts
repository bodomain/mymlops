import { getAuth, clerkClient } from '@clerk/nextjs/server';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await (await clerkClient()).users.getUser(userId);
    
    // Log ALL available fields to find where subscription data is
    const userKeys = Object.keys(user).filter(key => !key.startsWith('_'));
    console.log('User object keys:', userKeys);
    console.log('Full user object:', JSON.stringify(user, null, 2));
    
    // Check for premium subscription in various possible locations
    const hasPremium = 
      (user.publicMetadata as any)?.plan === 'premium_subscription' ||
      (user as any)?.subscriptions?.some((sub: any) => sub.status === 'active');

    return res.status(200).json({ 
      hasPremium,
      publicMetadata: user.publicMetadata,
      subscriptions: (user as any)?.subscriptions,
      userKeys: userKeys,
      fullUser: JSON.stringify(user),
    });
  } catch (error) {
    console.error('Subscription check error:', error);
    return res.status(500).json({ error: 'Internal server error', details: String(error) });
  }
}
