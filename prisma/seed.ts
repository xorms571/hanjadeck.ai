import { PrismaClient } from '@prisma/client';
import { mockupCards } from '../src/mockup/mockup-data';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding cards ...`);

  // Upsert cards
  for (const card of mockupCards) {
    const upsertedCard = await prisma.card.upsert({
      where: { character: card.character },
      update: {}, // No updates if it already exists
      create: {
        character: card.character,
        korean: card.korean,
        english: card.english,
        examples: card.examples,
      },
    });
    console.log(`Upserted card: ${upsertedCard.character}`);
  }

  console.log(`Card seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
