import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'

export const candidateRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
  }>();

  candidateRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            //@ts-ignore
            c.set("userId", user.id);
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            });
        }
    } catch (e) {
        console.log(e);
        c.status(403);
        return c.json({
            message: "You are not logged in"
        });
    }
  });

  candidateRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { name = '', experience = '', skills = '', location = '',  username = '' } = body;

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const candidate = await prisma.candidate.findFirst({
        where: {
            username 
        }
    });
  
    if (!candidate) {
        const candidate = await prisma.candidate.create({
            data: {
                name,
                username,
                skills,
                experience,
                location
            }
        });
        return c.json({
            id: candidate.id
        })
    }
    return c.text('Candidate already exist!')
  })
  
  candidateRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      const candidates = await prisma.candidate.findMany();
      return c.json(candidates);

  });

  candidateRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      try {
        const candidate = await prisma.candidate.findFirst({
            where: {
                id: Number(id)
            }
        });
        return c.json({ candidate });
      } catch (e) {
        c.status(411);
        return c.json({ "message": "Candidate doesn't exist"});
      }
  });
  
  candidateRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { id, name = '', experience = '', skills = '', location = '',  username = '' } = body;

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const candidate = await prisma.candidate.update({
        where: {
            id: id
        },
        data: {
            name, experience, skills, location, username
        }});
    return c.json({
        id: candidate.id
    });
  })