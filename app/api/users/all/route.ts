import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        const data = await prisma.user.findMany()
        return NextResponse.json({status: 200, message: "OK", data})
    } catch (err) {
        return NextResponse.json({status: 500, message: err instanceof Error ? err.message : "Unknown Error!"})
    }
}