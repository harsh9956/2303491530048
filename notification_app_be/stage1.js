const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJoc2luZ2g1MjY1MkBnbWFpbC5jb20iLCJleHAiOjE3ODExNjg5MDIsImlhdCI6MTc4MTE2ODAwMiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjViYzI5ZjJiLWM1MjctNGZjNS05YzA3LWVjNmFkM2Y5OTdmZiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImhhcnNoIHByYXRhcCBzaW5naCIsInN1YiI6ImRiYjQ0YTA5LTIwNTUtNGJhZS04NjUzLTgxNjViZGQ0N2E2MyJ9LCJlbWFpbCI6ImhzaW5naDUyNjUyQGdtYWlsLmNvbSIsIm5hbWUiOiJoYXJzaCBwcmF0YXAgc2luZ2giLCJyb2xsTm8iOiIyMzAzNDkxNTMwMDQ4IiwiYWNjZXNzQ29kZSI6IkJBVkRTaCIsImNsaWVudElEIjoiZGJiNDRhMDktMjA1NS00YmFlLTg2NTMtODE2NWJkZDQ3YTYzIiwiY2xpZW50U2VjcmV0IjoiQUtOd0p3R3JQR0FNVUFXYiJ9.ToJR7jnBPUsN8oj-RTbZbFlZCeWryWx7YI38MZ7xtHw";

const PRIORITY = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

async function getNotifications() {
  try {
    const response = await fetch(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    const data = await response.json();

    const notifications = data.notifications || [];

    const top10 = notifications
      .sort((a, b) => {
        const priorityDiff =
          PRIORITY[b.Type] - PRIORITY[a.Type];

        if (priorityDiff !== 0) {
          return priorityDiff;
        }

        return (
          new Date(b.Timestamp).getTime() -
          new Date(a.Timestamp).getTime()
        );
      })
      .slice(0, 10);

    console.log("TOP 10 PRIORITY NOTIFICATIONS");
    console.table(top10);
  } catch (error) {
    console.error(error);
  }
}

getNotifications();