import { User } from "../models/userModel.js";

const singup = (req, res) => {
    console.log("req.body: ",req.body);
    const { name, surname, username, password } = req.body;

    if (name.trim().length === 0 || surname.trim().length === 0 || username.trim().length === 0 || password.trim().length === 0) {
        return res.json({
            process: false,
            message: "İşlem başarısız. Bilgilerinizi boş bırakmayın"
        });
    }    

    User.findOne({
        username: username
    })
    .then(result => {
        if (result !== null) {
            return res.json({
                process: false,
                message: "Böyle bir username var"
            });
        } else {
            const add = new User({
                name: name,
                surname: surname,
                username: username,
                password: password
            });
            add.save()
            .then(result => {
                return res.json({
                    process: true,
                    message: "Kayıt başarılı"
                });
            })
            .catch(error => {
                console.error("Error:", error);
                return res.status(500).json({
                    process: false,
                    message: "Bir hata oluştu"
                });
            });
        }
    })
    .catch(error => {
        console.error("Error:", error);
        return res.status(500).json({
            process: false,
            message: "Bir hata oluştu"
        });
    });
};

const login = async (req, res) => {
     const { username, password } = req.body;

    if (username.trim().length === 0 || password.trim().length === 0) {
        return res.json({
            process: false,
            message: "İşlem başarısız. Bilgilerinizi boş bırakmayın"
        });
    } 
    var user=null;
    try{
        user=await User.findOne({
            username: username
        });
    }catch(err){
        return res.status(400).json({
            process: false,
            message: "Hata oluştu"
        });
    }

    if(user !=null){
        if(user.password==password){
            console.log("Giriş başarılı");
            return res.status(200).json({
                process: true,
                message: "Giriş başarılı",
                userId:user.id
            });
        }else{
            console.log("Kullanıcı adı veya şifre hatalı");
            return res.status(400).json({
                process: false,
                message: "Kullanıcı adı veya şifre hatalı"
            });
        }
    }else{
        console.log("Kullanıcı adı veya şifre hatalı2");
        return res.status(400).json({
            process: false,
            message: "Kullanıcı adı veya şifre hatalı"
        });
    }
    

};


const getUser=async(req, res)=>{
    var users=[];
    try{
        users=await User.find();
        return res.status(400).json({
            process: true,
            users
        });
    }catch(err){
        return res.status(400).json({
            process: false,
            message: "Hata oluştu"
        });
    }
}

const updateUserStatusById = async (req, res) => {
    const { userId, status } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { status: status }, { new: true });

        return res.status(200).json({
            process: true,
            user: updatedUser
        });
    } catch (err) {

        return res.status(400).json({
            process: false,
            message: "Hata oluştu"
        });
    }
};

const updateUserStatusByUsername = async (req, res) => {
    const { username, status } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(username, { status: status }, { new: true });

        return res.status(200).json({
            process: true,
            user: updatedUser
        });
    } catch (err) {

        return res.status(400).json({
            process: false,
            message: "Hata oluştu"
        });
    }
};

export { singup, login, getUser, updateUserStatusByUsername, updateUserStatusById};
