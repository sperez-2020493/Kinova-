import Category from './category.model.js';

export const categoríaDefaut = async () => {
    try {
        const category = await Category.findOne({ nameCategory: "Default Category" });
        if (!category) {
            await Category.create({
                nameCategory: "Noticias",
                description: "Todo lo que sea de caracter informativo",
                status: true
            });
            console.log("Categoria creada");
        } else {
            console.log("La categoria ya existe");
        }
    } catch (err) {
        console.log("Error al crear la categoria", err);
    }
};

export const crearCategoria = async (req, res) => {
    try {
      const data = req.body;
        const existCategory = await Category.findOne({ nameCategory: data.nameCategory });
      if (existCategory) {
        return res.status(400).json({
          success: false,
          msg: "Ya existe una categoría con este nombre",
        });
      }
  
      const category = new Category(data);
      await category.save();  
      return res.status(200).json({
        success: true,
        msg: `Categoría '${data.nameCategory}' creada exitosamente`,
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ 
        success: false, 
        msg: "Error al crear la categoría", 
        error 
      });
    }
  };

  export const editarCategorias = async (req, res) => {
    try {
      const { categoryId } = req.params; 
      const { nameCategory, description, status } = req.body;
  
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Categoría no encontrada",
        });
      }
  
      if (nameCategory) category.nameCategory = nameCategory;
      if (description) category.description = description;
      if (typeof status !== "undefined") category.status = status;
  
      await category.save(); 
  
      return res.status(200).json({
        success: true,
        message: "Categoría actualizada correctamente",
        category,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error al actualizar la categoría",
        error: err.message,
      });
    }
  };

  export const eliminarCategorias = async (req, res) => {
    const { categoryId } = req.params;
    try {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ 
          success: false, 
          message: "Categoría no encontrada" 
        });
      }
        category.status = false;
      await category.save();
  
      await Publication.updateMany(
        { category: categoryId }, 
        { $unset: { category: "" } } 
      );
  
      return res.status(200).json({
        success: true,
        message: "Categoría desactivada y desvinculada de publicaciones",
        category
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ 
        success: false, 
        message: "Error al desactivar la categoría y desvincularla",
        error: error.message
      });
    }
  };