"use client"

import Loader from '@/components/custom ui/Loader'
import EmployeeForm from '@/components/employees/EmployeeForm'
import React, { useEffect, useState } from 'react'

const EmployeeDetails = ({ params }: { params: { employeeId: string }}) => {
  const [loading, setLoading] = useState(true)
  const [employeeDetails, setEmployeeDetails] = useState<EmployeeType | null>(null)

  const getEmployeeDetails = async () => {
    try { 
      const res = await fetch(`/api/employees/${params.employeeId}`, {
        method: "GET"
      })
      const data = await res.json()
      setEmployeeDetails(data)
      setLoading(false)
    } catch (err) {
      console.log("[productId_GET]", err)
    }
  }

  useEffect(() => {
    getEmployeeDetails()
  }, [])

  return loading ? <Loader /> : (
    <EmployeeForm initialData={employeeDetails} />
  )
}

export default EmployeeDetails