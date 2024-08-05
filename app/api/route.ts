import { PrismaClient } from "@prisma/client";
import { omit } from "lodash";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.drink.findMany();
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("post=====");
  const current:any = await req.json();
  try {
    await prisma.drink.upsert({
      where: {
        uid: current.uid as any,
      },
      create: {
        ...current,
      },
      update: current,
    });
  } catch (error) {
    console.log("error", error);
  }

  return NextResponse.json(current);
}
