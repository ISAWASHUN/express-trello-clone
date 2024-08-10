import express, {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;

app.get('/health_check', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post("/register", async (req: Request, res: Response) => {
  const {name, email, password} = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({error: "Something went wrong"});
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const {email, password} = req.body;

  // ユーザーが存在するか確認
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  // ユーザーが存在しない場合はエラーを返す
  if (!user) return res.status(400).json({error: "Invalid email or password"});

  // パスワードが正しいか確認
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // パスワードが正しくない場合はエラーを返す
  if (!isPasswordValid) return res.status(400).json({error: "Invalid email or password"});

  // JWTを生成して返す
  const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET!, {expiresIn: "1h"});

  res.json({token});
})
