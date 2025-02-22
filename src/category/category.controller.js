import Category from './category.model.js';
import Post from '../post/post.model.js';


export const categoríaDefaut = async () => {
    try {
        const category = await Category.findOne({ nameCategory: "Noticias" });
        if (!category) {
            await Category.create({
                nameCategory: "Noticias",
                description: "Todo lo que sea de caracter informativo",
                status: true
            });
        } else {
        }
    } catch (err) {
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
      const { uid } = req.params; 
      const { nameCategory, description } = req.body;
  
      const category = await Category.findById(uid);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Categoría no encontrada",
        });
      }
  
      if (nameCategory) category.nameCategory = nameCategory;
      if (description) category.description = description;
  
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
    const { uid } = req.params;
    try {
      const category = await Category.findById(uid);
      if (!category) {
        return res.status(404).json({ 
          success: false, 
          message: "Categoría no encontrada" 
        });
      }
  
      const noticiasCategory = await Category.findOne({ nameCategory: "Noticias" });
      if (!noticiasCategory) {
        return res.status(404).json({
          success: false,
          message: "No se encontró la categoría 'Noticias'"
        });
      }
  
      await Post.updateMany(
        { category: uid }, 
        { $set: { category: noticiasCategory._id } }
      );
  
      await category.deleteOne();
  
      return res.status(200).json({
        success: true,
        message: "Categoría eliminada y publicaciones actualizada a la ategoria por defecto'Noticias'",
        category
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ 
        success: false, 
        message: "Error al eliminar la categoría y actualizar las publicaciones",
        error: error.message
      });
    }
  };