import express from "express"
import cors from "cors"
const app = express();
app.use(express.json())

const corsOption = {
    origin: "*",
    credentials: true
}

app.use(cors(corsOption))
import initializeDatabase from "./db/db.connect.js";
import Recipe from "./model/restaurant.model.js"
initializeDatabase();

app.get("/", (req, res) => {
    res.send("Hello")
})


const createRecipe = async (newRecipe) => {
    try {
        const addRecipe = new Recipe(newRecipe)
        const saveRecipe = await addRecipe.save();
        return saveRecipe
    } catch (error) {
        throw error;
    }
}

app.post("/recipe", async (req, res) => {
    try {
        const recipe = await createRecipe(req.body);
        if (recipe) {
            res.status(200).json({ message: "Recipe added successfully", recipe })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to add Recipe" })
    }
})

const getAllRecipe = async () => {
    try {
        const recipes = await Recipe.find();
        return recipes
    } catch (error) {
        throw error
    }
}

app.get("/recipe", async (req, res) => {
    try {
        const recipes = await getAllRecipe();
        if (recipes) {
            res.status(200).json({ recipes: recipes });

        } else {
            res.status(404).json({ message: "No recipes found." })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch recipes" })
    }
})

const deleteRecipeById = async (recipeId) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
        return deletedRecipe
    } catch (error) {
        throw error
    }
}

app.delete("/recipe/:id", async (req, res) => {
    try {
        const recipeId = req.params.id;
        const deletedRecipe = await deleteRecipeById(recipeId);
        if (deletedRecipe) {
            res.status(200).json({ message: "Recipe deleted Successfully", recipe: deletedRecipe })
        } else {
            res.status(404).json({ message: "Recipe not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete recipe." })
    }
})

const getRecipeByid = async (recipeId) => {
    try {
        const recipe = await Recipe.findById(recipeId)
        return recipe
    } catch (error) {
        throw error
    }
}

app.get("/recipe/:id", async (req, res) => {
    try {
        const recipeByid = req.params.id;
        const recipe = await getRecipeByid(recipeByid);
        if (recipe) {
            res.status(200).json({ message: "Recipe found:", recipe: recipe })
        } else {
            res.status(404).json({ error: "Recipe not found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch recipe." })
    }
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})