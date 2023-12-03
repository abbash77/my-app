// AdminDashboard.js
import React, { useEffect, useState } from 'react';
import Table from './Table';
import './admincss.css'
import { RiDeleteBin7Line } from "react-icons/ri";
import axios from 'axios'

// const data = [
//   { id:1, name: 'John Doe',email:"john@gmail.com", role: "Sde intern" },
//   { id:2, name: 'Jane Doe',email:"juli@gmail.com", role: "manager" },
//   // Add more data as needed
// ];

const AdminDashboard = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [data,setData]=useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const rowsPerPage = 10;

  const handleSelectRow = (rowId) => {
    const isSelected = selectedRows.includes(rowId);
    if (isSelected) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };
  useEffect(()=>{
       const getData=async()=>{
        const resp=await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        console.log(resp.data)
        setData(resp.data)
       }
       getData()
      
  },[])

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDeleteSelected = () => {

    // const updatedData = filteredData.filter((row) => row.id !== rowId);
    
    const updatedData = filteredData.filter((row) =>{
      for(let i=0;i<selectedRows.length;i++){
        
        if(selectedRows[i]===row.id){
          return false
        }
      }
      return true
    });
    setSelectedRows(selectedRows.filter((id) => id !== '0'));
    setData(updatedData);
  };

  const filteredData = data.filter((row) => {
    return Object.values(row).some(
      (value) => typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handlePagination = (page) => {
    const isSelected = selectedRows.includes('0');
    if (isSelected) {
      setSelectedRows(selectedRows.filter((id) => id !== '0'));
    } 
    setCurrentPage(page);
  };

  const handleEditRow = (rowId) => {
    // Implement edit row logic
    console.log('Edit row:', rowId);
  };
  const handleDeleteRow = (rowId) => {
    const updatedData = filteredData.filter((row) => row.id !== rowId);
    setData(updatedData);
  };
  const helper=()=>{
    console.log("hey")

    const isSelected2 = selectedRows.includes('0');
    console.log(isSelected2)
    // if (isSelected2) {
    //   setSelectedRows(selectedRows.filter((id) => id !== '0'));
    // } else {

    //   setSelectedRows([...selectedRows, '0']);
    // }

    let val=10*currentPage-10
    const isSelected = selectedRows.includes(filteredData[val].id);
    console.log(isSelected)
    if(isSelected){
      let values=selectedRows.filter((id) => {
        for(let i=0;i<10;i++){
          if(id===filteredData[i+val].id){
            return false
          }
          if(isSelected2){
            if(id==='0'){
              return false;
            }
          }
        }
        return true
      })
      
      setSelectedRows(values)
    }
    else{
      let dat=[]
      for(let i=0;i<10;i++){
        dat.push(filteredData[i+val].id)
        
      }
      if(!isSelected2){
        dat.push('0')
        setSelectedRows([...selectedRows, ...dat]);
      }
      else{
        setSelectedRows([...selectedRows, ...dat]);
      }
      
    }
    
  }

  return (
    <div>
      <div className='topclass'>
        <input className='searchinput' type="text"
        value={searchQuery}
        onChange={handleSearch} placeholder='Enter Value...'></input>
        <button onClick={handleDeleteSelected} className='btn btn3'><RiDeleteBin7Line /></button>
      </div>
      
      <Table
        data={filteredData}
        selectedRows={selectedRows}
        onSelectRow={handleSelectRow}
        onPagination={handlePagination}
        onEditRow={handleEditRow}
        onDeleteRow={handleDeleteRow}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        setData={setData}
        helper2={helper}
      />
    </div>
  );
};

export default AdminDashboard;
