import React, { useState } from 'react'
import './form.css'
import { adminRequest } from '../../api/request'
import { ThreeDots } from 'react-loader-spinner'

import { projectStorage } from '../../firebase/config'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'



const PackageForm = ({ closeForm }) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [attendance, setAttendance] = useState('')
    const [imageURL, setImageurl] = useState('')
    const [file, setFile] = useState(null)
    const [fileLoading, setFileLoading] = useState(false)

    const [titleError, setTitleError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [priceError, setPriceError] = useState('')
    const [attendanceError, setAttendanceError] = useState('')
    const [fileError, setFileError] = useState(null)

    const [loading, setLoading] = useState(false)

    const types = ['image/png', 'image/jpeg', 'image/jpg']

    const handleFile = (e) => {

        let selected = e.target.files

        if(!selected || selected.length !== 1) {
            return setFileError('1 image is required')
        }


        if(!types.includes(selected[0].type)) {
            return setFileError('please select an image (png or jpg)')
        }
        setFileLoading(true)
        const image = selected[0]
        const storageRef = ref(projectStorage, `images/${image.name}`)
        const metadata = { contentType: image.type }
        const uploadTask = uploadBytesResumable(storageRef, image, metadata)

        uploadTask.on('state_changed', snapshot => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        }, error => {
            setFileError(error)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref)
            .then(downloadURL => {
                setFile(image)
                setImageurl(downloadURL)
                setFileLoading(false)
            })
        })

        
    }

    const submit = () => {

        if(!title) {
            return setTitleError('title is required')
        }


        if(!price || price === 0) {
            return setPriceError('price is required')
        }

        if(!attendance || attendance === 0) {
            return setAttendanceError('attendance is required')
        }

        if(!description) {
            return setDescriptionError('description is required')
        }

        if(!imageURL) {
            return setFileError('image is required')
        }



        const userData = { title, description, price, attendance, imageURL }

        setLoading(true)

        adminRequest.post('/packages', userData)
        .then(response => {

            setTitle('')
            setDescription('')
            setPrice('')
            setAttendance('')

            setLoading(false)
            closeForm()
        })
        .catch(error => {
            
            setLoading(false) 

            const errorData = error.response.data

            if(errorData.field === 'title') {
                return setTitleError(errorData.message)
            } 
            
            if(errorData.field === 'description') {
                return setDescriptionError(errorData.message)
            }

            if(errorData.field === 'price') {
                return setPriceError(errorData.message)
            }

            if(errorData.field === 'attendance') {
                return setAttendanceError(errorData.message)
            }

            if(errorData.field === 'imageURL') {
                return setFileError(errorData.message)
            }
        })
        
    }


    return (
        <div className="modal-container">
            <div className="modal-wrapper">
                    <form>
                        <div>
                            <p>{titleError}</p>
                            <input type="text" placeholder="title" value={title} onChange={e => {
                                setTitle(e.target.value)
                                setTitleError('')
                            }} />
                        </div>
                        <div>
                            <p>{priceError}</p>
                            <input type="number" placeholder="price" value={price} onChange={e => {
                                setPrice(parseInt(e.target.value))
                                setPriceError('')
                            }} />
                        </div>
                        <div>
                            <p>{attendanceError}</p>
                            <input type="number" placeholder="attendance" value={attendance} onChange={e => {
                                setAttendance(parseInt(e.target.value))
                                setAttendanceError('')
                            }} />
                        </div>
                        <div>
                            <p>{descriptionError}</p>
                            <label className="description-label">Description</label>
                            <textArea className="form-text-area" onChange={e => {
                                setDescription(e.target.value)
                                setDescriptionError('')
                            }}>
                            </textArea>
                        </div>
                        <div className="form-btns">
                            {file && <div>{ file.name }</div>}
                            <p>{fileError}</p>
                        <label class="custom-file-upload" onClick={e => setFileError('')}>
                            <input type="file" onChange={handleFile} />
                            { fileLoading ? <ThreeDots color="white" height={20} width={20} /> : 'UPLOAD IMAGE' }
                        </label>
                            <button className="submit-btn" onClick={e => {
                                e.preventDefault()
                                submit()
                            }}>
                                { loading ? <ThreeDots color="white" height={20} width={20} /> : 'SUBMIT' }
                            </button>
                            <button className="cancel-btn bg-danger text-white" onClick={e => {
                                e.preventDefault()
                                closeForm()
                            }}>
                                CANCEL
                            </button>
                        </div>
                    </form>
            </div>
        </div>
    )
}

export default PackageForm