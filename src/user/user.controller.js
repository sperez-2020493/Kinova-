import { hash, verify  } from "argon2";
import User from "./user.model.js"

export const actualizarUsuario = async (req, res) => {
    try {
        const { uid } = req.params;
        const { name, surname, username, email, phone, oldPassword, newPassword } = req.body;

        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
        let actualizarUser = {};

        if (name) actualizarUser.name = name;
        if (surname) actualizarUser.surname = surname;
        if (username) actualizarUser.username = username;
        if (email) actualizarUser.email = email;
        if (phone) actualizarUser.phone = phone;

        if (newPassword) {
            if (!oldPassword) {
                return res.status(400).json({ success: false, message: 'Debes ingresar tu contraseña actual para cambiarla' });
            }
            const isMatch = await verify(user.password, oldPassword);
            if (!isMatch) {
                return res.status(400).json({ success: false, message: 'La contraseña actual es incorrecta' });
            }

            if (await verify(user.password, newPassword)) {
                return res.status(400).json({ success: false, message: 'La nueva contraseña no puede ser igual a la anterior' });
            }

            actualizarUser.password = await hash(newPassword);
        }
        if (Object.keys(actualizarUser).length === 0) {
            return res.status(400).json({ success: false, message: 'No se enviaron cambios para actualizar' });
        }
        const actualizar = await User.findByIdAndUpdate(uid, actualizarUser, { new: true });

        return res.status(200).json({ success: true, message: 'Usuario actualizado', user: actualizar });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Error al actualizar usuario', error: err.message });
    }
};