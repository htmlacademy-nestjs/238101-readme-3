import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDB() {
  await prisma.publication.upsert({
    create: {
      type: 'Link',
      status: 'Published',
      link: 'https://htmlacademy.ru',
      description: 'html academy',
      tags: ['it', 'online'],
    },
    update: {},
    where: {
      id: 1,
    },
  });

  await prisma.publication.upsert({
    create: {
      type: 'Photo',
      status: 'Published',
      photo: 'path/to/photo',
    },
    update: {},
    where: {
      id: 2,
    },
  });

  await prisma.publication.upsert({
    create: {
      type: 'Quote',
      status: 'Published',
      content: 'Say my name',
      authorQuote: 'Walter White',
    },
    update: {},
    where: {
      id: 3,
    },
  });

  await prisma.publication.upsert({
    create: {
      type: 'Text',
      status: 'Published',
      announcement: 'announcement text',
      name: 'name of publication',
      content: 'text of publication',
    },
    update: {},
    where: {
      id: 4,
    },
  });

  await prisma.publication.upsert({
    create: {
      type: 'Video',
      status: 'Published',
      name: 'name of video',
      link: 'youtube.com',
      tags: ['cats'],
    },
    update: {},
    where: {
      id: 5,
    },
  });

  await prisma.comment.upsert({
    create: {
      text: 'seed comment',
      publicationId: 3,
      authorId: '123',
    },
    update: {},
    where: {
      id: 1,
    },
  });

  await prisma.like.upsert({
    create: {
      publicationId: 2,
      authorId: '123',
    },
    update: {},
    where: {
      id: 1,
    },
  });

  console.info('🤘️ Database was filled');
}

fillDB()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();

    process.exit(1);
  });
