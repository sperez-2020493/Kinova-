import Post from '../post/post.model.js';
import User from '../user/user.model.js';
import Comment from '../comment/comment.model.js'
import jwt from 'jsonwebtoken';


export const crearComentario = async (req, res) => {
    try {
      const data = req.body;
  
      const token = req.headers.authorization?.split(' ')[1];
  
      const descodificar = jwt.verify(token, process.env.SECRETORPRIVATEKEY); 
      const userId = descodificar.uid; 
  
      const existUser = await User.findById(userId);
      if (!existUser) {
        return res.status(400).json({
          success: false,
          msg: "El autor no existe",
        });
      }
  
      const existPost = await Post.findById(data.post);
      if (!existPost) {
        return res.status(400).json({
          success: false,
          msg: "La publicación no existe",
        });
      }
  
      const comment = new Comment({ ...data, author: userId });
      await comment.save();
  
      return res.status(200).json({
        success: true,
        msg: "Comentario creado exitosamente",
        comment,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        msg: "Error al crear el comentario",
        error: error.message,
      });
    }
  };

  export const editarComentario = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
  
      let descodificar;
      try {
        descodificar = jwt.verify(token, process.env.SECRETORPRIVATEKEY); 
      } catch (err) {
        return res.status(401).json({
          success: false,
          message: 'Token inválido o expirado',
          error: err.message,
        });
      }
  
      const userId = descodificar.uid;
      const { uid } = req.params;  
      const { text } = req.body;   
  
      const comment = await Comment.findById(uid);
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: 'Comentario no encontrado',
        });
      }
  
      if (comment.author.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: 'No tienes permiso para editar este comentario',
        });
      }
        if (text) {
        comment.text = text;
      }
  
      await comment.save();
      return res.status(200).json({
        success: true,
        message: 'Comentario actualizado',
        comment,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Error al actualizar el comentario',
        error: error.message,
      });
    }
  };

  export const eliminarComentario = async (req, res) => {
    try {
      const cabecera = req.header('Authorization');
      const token = cabecera.split(" ")[1];
  
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY); 
      } catch (err) {
        return res.status(401).json({
          success: false,
          message: 'Token inválido o expirado',
          error: err.message
        });
      }
      
      const userId = decoded.uid;  
      const { uid } = req.params;   
      const comentario = await Comment.findById(uid);
      if (!comentario) {
        return res.status(404).json({
          success: false,
          message: 'Comentario no encontrado',
        });
      }
  
      if (comentario.author.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: 'No tienes permiso para eliminar este comentario',
        });
      }
  
      await comentario.deleteOne();
  
      return res.status(200).json({
        success: true,
        message: 'Comentario eliminado exitosamente',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Error al eliminar el comentario',
        error: error.message,
      });
    }
  };