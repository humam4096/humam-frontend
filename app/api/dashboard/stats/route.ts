// src/app/api/dashboard/stats/route.ts
import { getDb } from "@/db/client";
import { users, contacts } from "@/db/schema";
import { count, sql, gte } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const db = getDb();

    // Calculate date 30 days ago for trend analysis
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoISO = thirtyDaysAgo.toISOString();

    // Get total users count
    const [totalUsersResult] = await db
      .select({ count: count() })
      .from(users);

    // Get users created in last 30 days
    const [recentUsersResult] = await db
      .select({ count: count() })
      .from(users)
      .where(gte(users.createdAt, thirtyDaysAgoISO));

    // Get total messages count
    const [totalMessagesResult] = await db
      .select({ count: count() })
      .from(contacts);

    // Get messages by status
    const [newMessagesResult] = await db
      .select({ count: count() })
      .from(contacts)
      .where(sql`${contacts.status} = 'new'`);

    const [readMessagesResult] = await db
      .select({ count: count() })
      .from(contacts)
      .where(sql`${contacts.status} = 'read'`);

    const [repliedMessagesResult] = await db
      .select({ count: count() })
      .from(contacts)
      .where(sql`${contacts.status} = 'replied'`);

    // Get messages in last 30 days
    const [recentMessagesResult] = await db
      .select({ count: count() })
      .from(contacts)
      .where(gte(contacts.createdAt, thirtyDaysAgoISO));

    // Get users by role
    const usersByRole = await db
      .select({
        role: users.role,
        count: count(),
      })
      .from(users)
      .groupBy(users.role);

    // Get messages by service type (if service field is used)
    const messagesByService = await db
      .select({
        service: contacts.service,
        count: count(),
      })
      .from(contacts)
      .where(sql`${contacts.service} IS NOT NULL`)
      .groupBy(contacts.service);

    // Calculate percentage changes
    const totalUsers = totalUsersResult.count;
    const recentUsers = recentUsersResult.count;
    const userGrowthPercentage = totalUsers > 0 
      ? ((recentUsers / totalUsers) * 100).toFixed(1)
      : "0.0";

    const totalMessages = totalMessagesResult.count;
    const recentMessages = recentMessagesResult.count;
    const messageGrowthPercentage = totalMessages > 0
      ? ((recentMessages / totalMessages) * 100).toFixed(1)
      : "0.0";

    const stats = {
      users: {
        total: totalUsers,
        recent: recentUsers,
        growthPercentage: userGrowthPercentage,
        byRole: usersByRole.reduce((acc, item) => {
          acc[item.role || 'unknown'] = item.count;
          return acc;
        }, {} as Record<string, number>),
      },
      messages: {
        total: totalMessages,
        recent: recentMessages,
        growthPercentage: messageGrowthPercentage,
        new: newMessagesResult.count,
        read: readMessagesResult.count,
        replied: repliedMessagesResult.count,
        byService: messagesByService.reduce((acc, item) => {
          acc[item.service || 'other'] = item.count;
          return acc;
        }, {} as Record<string, number>),
      },
    };

    return Response.json({ 
      success: true, 
      data: stats 
    }, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return Response.json({ 
      success: false,
      error: "Failed to fetch dashboard stats" 
    }, { status: 500 });
  }
}
