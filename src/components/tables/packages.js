import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import TableIcons from './tableIcons'
import { adminRequest } from '../../api/request'
import Alert from '../alert/alert'


const PackagesTable = ({ openForm }) => {

    const headerStyle = {
        fontWeight: 'normal'
    }

    const [packages, setPackages] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [showToast, setShowToast] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const columns = [
        { title: 'Image', field: 'imageURL', editable: 'never', headerStyle: headerStyle, render: prop => {
            return <img src={prop.imageURL} alt="package description" />
        } },
        { title: 'Title', field: 'title', headerStyle: headerStyle, validate: rowData => rowData.title === '' ? 'title is required' : '' },
        { title: 'Price', field: 'price', headerStyle: headerStyle, validate: rowData => rowData.price === '' ? 'price is required' : '' },
        { title: 'Attendance', field: 'attendance', headerStyle: headerStyle, validate: rowData => rowData.attendance === '' ? 'attendance is required' : '' },
        { title: 'Creation Date', field: 'createdAt', editable: 'never', headerStyle: headerStyle },

    ]

    const formateDate = (regDate) => {

        const dateObj = new Date(regDate)
        
        return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)}-${dateObj.getDate()}`
    }

    const formateData = (packages) => {

        for(let i=0;i<packages.length;i++) {
            packages[i].createdAt = formateDate(packages[i].createdAt) 
        }

        return packages
    }

    const deletePackage = async (packageData) => {

        adminRequest.delete(`/packages/${packageData._id}`)
        .then(response => {
            setIsLoading(true)
        })
        .catch(error => console.error(error))
        
    }

    const updatePackage = async (newPackage, oldPackage) => {

        adminRequest.put(`/packages/${oldPackage._id}`, newPackage)
        .then(response => setIsLoading(true))
        .catch(error => {
            setErrorMessage(error.response.data.message)
            setShowToast(true)
        })
    }

    useEffect(() => {

        adminRequest.get('/packages')
        .then(response => {
            setPackages(formateData(response.data.packages))
            setIsLoading(false)
        })
        .catch(error => console.error(error))

    }, [isLoading])

    return (
        <div>
            { showToast ? <Alert bodyMessage={errorMessage}/> : null }
            <MaterialTable 
                title="Packages"
                isLoading={isLoading}
                columns={columns}
                data={packages}
                icons={TableIcons}
                options={{ pageSize: 5 }}
                editable={{
                    onRowUpdate: updatePackage,
                    onRowDelete: deletePackage
                }}

                actions={[
                    {
                        icon: TableIcons.Add,
                        tooltip: 'add package',
                        isFreeAction: true,
                        onClick: e => openForm()
                    },
                    {
                        icon: TableIcons.Refresh,
                        tooltip: 'reload package',
                        isFreeAction: true,
                        onClick: e => setIsLoading(true)
                    }
                ]}
            />
        </div>
    )

}

export default PackagesTable