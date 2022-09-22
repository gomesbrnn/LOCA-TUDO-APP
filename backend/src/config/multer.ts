import multer from 'multer';
import crypto from 'crypto'

export default {
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'uploads')
        },
        filename(request, file, callback){
            const randomNumber = crypto.randomBytes(4).toString('hex');
            callback(null, `locatudo-poster-${randomNumber}-${file.originalname}`);
        }
    })
}
