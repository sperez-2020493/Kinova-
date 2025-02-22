import { hash, verify  } from "argon2";
import Post from "./post.model.js"
import User from '../user/user.model.js';  // Asegúrate de usar la ruta correcta
import Category from "../category/category.model.js"
import jwt from 'jsonwebtoken';

export const crearPost = async (req, res) => {
    try {
      const data = req.body;
  
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({
          success: false,
          msg: "Token de autorización no proporcionado",
        });
      }
  
      const descodificar = jwt.verify(token, process.env.SECRETORPRIVATEKEY); 
      const userId = descodificar.uid; 
  
      const existUser = await User.findById(userId);
      if (!existUser) {
        return res.status(400).json({
          success: false,
          msg: "El autor no existe",
        });
      }
      const existCategory = await Category.findById(data.category);
      if (!existCategory) {
        return res.status(400).json({
          success: false,
          msg: "La categoría no existe",
        });
      }
  
      const post = new Post({...data,author: userId,  });
      await post.save();
  
      return res.status(200).json({
        success: true,
        msg: `Post '${data.title}' creado exitosamente`,
        post,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        msg: "Error al crear el post",
        error: error.message,
      });
    }
  };


  export const editarPost = async (req, res) => {
    try {
      const cabecera = req.header('Authorization');
      const token = cabecera.split(" ")[1];
  
      let descodificar;
      try {
        descodificar = jwt.verify(token, process.env.SECRETORPRIVATEKEY); 
      } catch (err) {
        return res.status(401).json({
          success: false,
          message: 'Token inválido o expirado',
          error: err.message
        });
      }
  
      const userId = descodificar.uid; 
      const { uid } = req.params; 

      const post = await Post.findById(uid);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Publicación no encontrada',
        });
      }
  
      if (post.author.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: 'No tienes permiso para editar esta publicación',
        });
      }
  
      const { title, bodyPost } = req.body;
      let updatedPost = {};
  
      if (title) updatedPost.title = title;
      if (bodyPost) updatedPost.bodyPost = bodyPost;
  
      if (Object.keys(updatedPost).length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No se enviaron cambios',
        });
      }
  
      const postActualizada = await Post.findByIdAndUpdate(uid, updatedPost, { new: true });
  
      return res.status(200).json({
        success: true,
        message: 'Publicación actualizada',
        post: postActualizada,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Error al actualizar',
        error: error.message,
      });
    }
  };


  export const eliminarPost = async (req, res) => {
    try {
      const cabecera = req.header('Authorization');
      const token = cabecera.split(" ")[1];
  
      let descodificar;
      try {
        descodificar = jwt.verify(token, process.env.SECRETORPRIVATEKEY); 
      } catch (err) {
        return res.status(401).json({
          success: false,
          message: 'Token inválido o expirado',
          error: err.message
        });
      }
  
      const userId = descodificar.uid; 
      const { uid } = req.params; 

      const post = await Post.findById(uid);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Publicación no encontrada',
        });
      }
  
      if (post.author.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: 'No tienes permiso para eliminar esta publicación',
        });
      }
  
      await post.deleteOne();
  
      return res.status(200).json({
        success: true,
        message: 'Publicación eliminada correctamente',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Error al eliminar la publicación',
        error: error.message,
      });
    }
  };