import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import TableIcons from './tableIcons'
import { adminRequest } from '../../api/request'

const RegisteredPackagesTable = () => {

    const headerStyle = {
        fontWeight: 'normal'
    }

    const [registeredPackages, setRegisteredPackages] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const columns = [
        { title: 'Image', field: 'imageURL', editable: 'never', headerStyle: headerStyle, render: prop => {
            return <img src={prop.imageURL} alt="package description" />
        } },
        { title: 'Member Name', field: 'memberName', headerStyle: headerStyle },
        { title: 'Member Phone', field: 'memberPhone', headerStyle: headerStyle },
        { title: 'Membership', field: 'membership', headerStyle: headerStyle },
        { title: 'Club', field: 'club', headerStyle: headerStyle },
        { title: 'Payment Method', field: 'paymentMethod', headerStyle: headerStyle },
        { title: 'Registration Date', field: 'createdAt', headerStyle: headerStyle },
        { title: 'Package', field: 'packageName', headerStyle: headerStyle },
        { title: 'Registration User', field: 'username', headerStyle: headerStyle },
    ]

    const formateDate = (regDate) => {

        const dateObj = new Date(regDate)
        
        return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)}-${dateObj.getDate()}`
    }

    const formateData = (registeredPackages) => {


        for(let i=0;i<registeredPackages.length;i++) {

            try {
                registeredPackages[i].username = registeredPackages[i].user[0].username
            } catch(error) {
                registeredPackages[i].username = 'online'
            }


            registeredPackages[i].packageName = registeredPackages[i].package[0].title
            registeredPackages[i].createdAt = formateDate(registeredPackages[i].createdAt)
            registeredPackages[i].memberName = registeredPackages[i].member[0]['username']
            registeredPackages[i].memberPhone = registeredPackages[i].member[0].phone
            registeredPackages[i].membership = registeredPackages[i].member[0].membership
            registeredPackages[i].club = registeredPackages[i].member[0].club
            registeredPackages[i].imageURL = `https://avatars.dicebear.com/api/initials/${registeredPackages[i].memberName}.svg`

            
        }

        return registeredPackages
    }

    const deleteMemberPackage = async (memberPackageData) => {

        adminRequest.delete(`/members-packages/${memberPackageData._id}`)
        .then(response => {
            setIsLoading(true)
        })
        .catch(error => console.error(error))
    }

    useEffect(() => {

        adminRequest.get('/members-packages/all')
        .then(response => {

            setRegisteredPackages(formateData(response.data.registeredPackages))
            setIsLoading(false)
        })
        .catch(error => console.error(error))

    }, [isLoading])

    return (
        <div>
            <MaterialTable 
                title="Registered Packages"
                isLoading={isLoading}
                columns={columns}
                data={registeredPackages}
                icons={TableIcons}
                options={{ pageSize: 10 }}
                editable={{
                    onRowDelete: deleteMemberPackage
                }}
                actions={[{
                    icon: TableIcons.Refresh,
                    tooltip: 'reload members packages',
                    isFreeAction: true,
                    onClick: () => setIsLoading(true)
                }]}
            />
        </div>
    )

}

export default RegisteredPackagesTable