import { ApiCall } from "../config_Api";

export const uploadResume = async (resume) => {
    try {
        console.log(resume.name)
        // Read the file content as base64
        const fileReader = new FileReader();

        return new Promise((resolve, reject) => {
            fileReader.onload = () => {
                const base64Data = fileReader.result.split(',')[1];
                ApiCall.put('user/upload-resume', { resume: base64Data ,name:resume.name })
                    .then((res) => {
                        console.log(res);
                        resolve(res.data);
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error.response ? error.response.data : "server error");
                    });
            };
            fileReader.readAsDataURL(resume);
        });
    } catch (error) {
        console.error(error);
        throw error.response ? error.response.data : "server error";
    }
};

export const getAllEmployeeResumes = async ()=>{
    try {
        const res = await ApiCall.get('user/get-employee-resumes')
        return res.data
    } catch (error) {
        console.error(error);
        throw error.response ? error.response.data : "server error";
    }
}