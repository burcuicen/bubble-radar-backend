import { Request, Response } from "express";
import { create, deleteById, getAll, getById, updateById } from "../services/niche-search";

export async function getAllMyNicheSearches(req: Request, res: Response): Promise<void> {
  try {
    const params = req.query;
    const results = await getAll(params);
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getMyNicheSearchById(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    const result = await getById(id);
    if (!result) {
      res.status(404).json({ error: "Not found" });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createMyNicheSearch(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;
    console.log(req, "req.body", req.body);
    const result = await create(data);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateMyNicheSearchById(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    const data = req.body;
    //@ts-ignore
    console.log(req.data);
    const result = await updateById(id, data);
    if (!result) {
      res.status(404).json({ error: "Not found" });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteMyNicheSearchById(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    const result = await deleteById(id);
    if (!result) {
      res.status(404).json({ error: "Not found" });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

