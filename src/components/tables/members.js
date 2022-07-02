import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import TableIcons from './tableIcons'
import { adminRequest } from '../../api/request'
import gazeeraImage from '../../images/gazeera.jpeg'
import sportingImage from '../../images/sporting.png'
import saedImage from '../../images/saed.jpeg'

const MembersTable = () => {

    const headerStyle = {
        fontWeight: 'normal'
    }

    const [members, setMembers] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    const columns = [
        { title: 'Image', field: 'imageURL', editable: 'never', export: false, headerStyle: headerStyle, render: prop => {
            return <img src={prop.imageURL} alt="package description" />
        } },
        { title: 'username', field: 'username', headerStyle: headerStyle },
        { title: 'email', field: 'email', headerStyle: headerStyle },
        { title: 'phone', field: 'phone', headerStyle: headerStyle },
        { title: 'club', field: 'club', headerStyle: headerStyle },
        { title: 'membership', field: 'membership', headerStyle: headerStyle },
        { title: 'Registration Date', field: 'createdAt', editable: 'never', headerStyle: headerStyle },

    ]

    const formateDate = (regDate) => {

        const dateObj = new Date(regDate)
        
        return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)}-${dateObj.getDate()}`
    }

    const formateData = (members) => {

        for(let i=0;i<members.length;i++) {
            members[i].createdAt = formateDate(members[i].createdAt)
            members[i].imageURL = `https://avatars.dicebear.com/api/initials/${members[i].username}.svg`
        }

        return members
    }

    const deleteMember = async (memberData) => {

        adminRequest.delete(`/members/${memberData._id}`)
        .then(response => {
            setIsLoading(true)
        })
        .catch(error => console.error(error))
    }

    useEffect(() => {

        adminRequest.get('/members')
        .then(response => {
            setMembers(formateData(response.data.members))
            setIsLoading(false)
        })
        .catch(error => console.error(error))

    }, [isLoading])

    return (
        <div>
            <MaterialTable 
                title="Members"
                isLoading={isLoading}
                
                columns={columns}
                data={members}
                icons={TableIcons}
                options={{ pageSize: 10, exportButton: true }}
                editable={{
                    onRowDelete: deleteMember
                }}

                actions={[
                    {
                        icon: TableIcons.Refresh,
                        tooltip: 'reload members',
                        isFreeAction: true,
                        onClick: () => setIsLoading(true) 
                    }
                ]}
            />
        </div>
    )

}

export default MembersTable