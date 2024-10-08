import { Request, Response } from "express";
import database from "../services/database";
import Product from "../interface/Product";

export class ProductController {

    // GET products
    public static async find(req: Request, res: Response) {
        try {
            const limit = parseInt(req.query.limit as string) || 10;
            const page = parseInt(req.query.page as string) || 1;
            const nameFilter = req.query.name as string || "";

            const skip = (page - 1) * limit;
            const result = await database.allDocs({ include_docs: true });

            let filteredProducts = result.rows
                .map(row => row.doc)
                .filter((product:any) => 
                    product.name.toLowerCase().includes(nameFilter.toLowerCase())
                );
            
            const paginatedProducts = filteredProducts.slice(skip, skip+limit)

            res.status(200).json({
                products: paginatedProducts,
                meta: {
                    total: filteredProducts.length,
                    limit,
                    page
                }
            })

        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar todos produtos: ", error});
        }
    }

    // GET BY ID product
    public static async findOne(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const product = await database.get(id)

            res.status(200).json(product);
        } catch (error) {
            if (error instanceof Error && "status" in error && error.status == 404) {
                res.status(404).json("Produto não encontrado.");
            }
            else {
                res.status(500).json({ message: "Erro ao buscar um produto: ", error })
            }           
        }
    }

    // POST product
    public static async create(req: Request, res: Response) {
        try {
            const { name, price, stock } = req.body;

            if (!name || !price || !stock) {
                return res.status(400).json({
                    message: "Campos obrigatórios: NOME, PREÇO E QUANTIDADE EM ESTOQUE"
                })
            }


            const newProduct = {
                name,
                price,
                stock
            };

            const result = await database.post(newProduct);
            res.status(201).json(result);

        } catch (error) {
            res.status(500).json({ message: "Erro ao inserir um produto: ", error });
        }
    }

    // UPDATE product
    
    public static async update(req: Request, res: Response) {
        try {
            const productId = req.params.id;
            const { name, price, stock } = req.body;
            
            const currentProduct = await database.get<Product>(productId);

            const updatedProduct = {
                ...currentProduct,
                name: name ?? currentProduct.name,
                price: price ?? currentProduct.price,
                stock: stock ?? currentProduct.stock
            }

            const result = await database.put(updatedProduct);
            return res.status(200).json({ message: "Produto atualizado com sucesso: ", result});

        } catch (error) {
            if (error instanceof Error && "status" in error && error.status == 404) {
                res.status(404).json("Produto não encontrado.");
            }
            else {
                res.status(500).json({ message: "Erro ao atualizar um produto: ", error })
            }
        }
    }
        

    // DELETE product
    public static async delete(req: Request, res: Response) {
        try {
            const productId = req.params.id;

            const product = await database.get(productId);
            database.remove(product);

            res.status(200).json({ message: "Produto deletado com sucesso.", product});
        } catch (error) {
            if (error instanceof Error && "status" in error && error.status == 404) {
                res.status(404).json("Produto não encontrado.");
            }
            else {
                res.status(500).json({ message: "Erro ao deletar um produto: ", error })
            }
        }
    }
    
}