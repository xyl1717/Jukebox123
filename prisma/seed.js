const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Alice',
        email: 'alice@example.com',
        playlists: {
          create: [
            { title: 'Alice’s Party Mix' },
            { title: 'Alice’s Chill Vibes' },
            { title: 'Alice’s Workout Playlist' },
            { title: 'Alice’s Study Beats' },
            { title: 'Alice’s Morning Tunes' }
          ]
        }
      }
    }),
    prisma.user.create({
      data: {
        name: 'Bob',
        email: 'bob@example.com',
        playlists: {
          create: [
            { title: 'Bob’s Rock Classics' },
            { title: 'Bob’s Hip-Hop Playlist' },
            { title: 'Bob’s Electronic Vibes' },
            { title: 'Bob’s Jazz Collection' },
            { title: 'Bob’s Sleepy Songs' }
          ]
        }
      }
    }),
    prisma.user.create({
      data: {
        name: 'Charlie',
        email: 'charlie@example.com',
        playlists: {
          create: [
            { title: 'Charlie’s Chill Tunes' },
            { title: 'Charlie’s Indie Mix' },
            { title: 'Charlie’s Dance Hits' },
            { title: 'Charlie’s Oldies' },
            { title: 'Charlie’s Classical Collection' }
          ]
        }
      }
    })
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
