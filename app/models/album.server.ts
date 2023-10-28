import type { User, Album } from "@prisma/client";

import { prisma } from "~/db.server";



export function createAlbum({
name,
price,
userId
}: Pick<Album, "name" | "price"> & {
  userId: User["id"];
}) {
  return prisma.album.create({
    data: {
      name,
      cover: "",
      price,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function getAlbum({
  id,
  userId,
}: Pick<Album, "id"> & {
  userId: User["id"];
}) {
  return prisma.album.findFirst({
    select: { id: true, name: true, cover: true, price: true },
    where: { id, userId },
  });
}