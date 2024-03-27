import bcrypt from "bcrypt";

export const generateToken = async (token: String) => {

    return await bcrypt.hash(token.toString(), 10);

}