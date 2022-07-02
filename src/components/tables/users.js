import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import TableIcons from './tableIcons'
import { adminRequest } from '../../api/request'
import Alert from '../alert/alert'
import UserForm from '../forms/user'

const UsersTable = ({ openForm }) => {

    const headerStyle = {
        fontWeight: 'normal'
    }

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState()
    const [showToast, setShowToast] = useState(false)

    const columns = [
        { title: 'Image', field: 'imageURL', export: false, editable: 'never', headerStyle: headerStyle, render: prop => {
            return <img src={prop.imageURL} alt="package description" />
        } },
        { title: 'username', field: 'username', headerStyle: headerStyle, validate: rowData => rowData.username === '' ? 'username is required' : '' },
        { title: 'email', field: 'email', headerStyle: headerStyle, validate: rowData => rowData.email === '' ? 'email is required' : ''  },
        { title: 'phone', field: 'phone', headerStyle: headerStyle, validate: rowData => rowData.phone === '' ? 'phone is required' : ''  },
        { title: 'Registration Date', field: 'createdAt', editable: 'never', headerStyle: headerStyle },

    ]

    const formateDate = (regDate) => {

        const dateObj = new Date(regDate)
        
        return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)}-${dateObj.getDate()}`
    }

    const formateData = (users) => {

        for(let i=0;i<users.length;i++) {
            users[i].createdAt = formateDate(users[i].createdAt)
            users[i].imageURL = `https://avatars.dicebear.com/api/initials/${users[i].username}.svg`
        }

        return users
    }

    const deleteUser = async (userData) => {

        adminRequest.delete(`/users/${userData._id}`)
        .then(response => {
            setIsLoading(true)
        })
        .catch(error => console.error(error))
        
    }

    const updateUser = async (newUser, oldUser) => {

        adminRequest.put(`/users/${oldUser._id}`, newUser)
        .then(response => setIsLoading(true))
        .catch(error => {
            setErrorMessage(error.response.data.message)
            setShowToast(true)
        })
    }


    useEffect(() => {

        adminRequest.get('/users')
        .then(response => {
            setUsers(formateData(response.data.users))
            setIsLoading(false)
        })
        .catch(error => console.error(error))

    }, [isLoading])

    return (
        <div>
            <div className="error-message" style={{ width: '100%' }}>
                { showToast ? <Alert bodyMessage={errorMessage}/> : null }
            </div>
            <MaterialTable 
                title="Users"
                isLoading={isLoading}
                columns={columns}
                data={users}
                icons={TableIcons}
                options={{ pageSize: 10, exportButton: true }}
                editable={{
                    onRowDelete: deleteUser,
                    onRowUpdate: updateUser
                }}

                actions={[
                    {
                        icon: TableIcons.Add,
                        tooltip: 'add user',
                        isFreeAction: true,
                        onClick: () => openForm()
                    },
                    {
                        icon: TableIcons.Refresh,
                        tooltip: 'reload users',
                        isFreeAction: true,
                        onClick: () => setIsLoading(true)
                    }
                ]}

            />
        </div>
    )

}

export default UsersTable