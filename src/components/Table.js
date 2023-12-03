// Table.js
import React from 'react';
import './table.css'
import { useState } from 'react';
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md"
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const EditCard = ({ row, onClose, onSave }) => {
  const [editedName, setEditedName] = useState(row.name);
  const [editedEmail, setEditedEmail] = useState(row.email);
  const [editedRole, setEditedRole] = useState(row.role);

  const handleSave = () => {
    // Your save logic here
    onSave(row.id, editedName,editedEmail,editedRole);
    onClose();
  };

  return (
    <div className="edit-card">
      {/* <h2>Edit Row</h2> */}
      <label>Name:</label>
      <input
        type="text"
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
      />
      <label>Email:</label>
      <input
        type="text"
        value={editedEmail}
        onChange={(e) => setEditedEmail(e.target.value)}
      />
        <label>Role:</label>
        <input
        type="text"
        value={editedRole}
        onChange={(e) => setEditedRole(e.target.value)}
      />
      <div>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
      </div>
      
    </div>
  );
};


const Table = ({
  data,
  selectedRows,
  onSelectRow,
  onPagination,
  onEditRow,
  currentPage,
  rowsPerPage,
  onDeleteRow,
  setData,
  helper2
}) => {
  const [editCardVisible, setEditCardVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = data.slice(startIndex, endIndex);
    
    let totalPage= Math.ceil(data.length / rowsPerPage)
    const handleCloseEditCard = () => {
      setEditCardVisible(false);
    };
    const handleEditRow = (row) => {
      setSelectedRow(row);
      setEditCardVisible(true);
    };
    const handleSaveEditCard = (rowId, editedName, editedEmail,editedRole) => {
      // Update the data with the edited values
      const updatedData = data.map((row) => {
        if (row.id === rowId) {
          return { ...row, name: editedName, email: editedEmail,role:editedRole };
        }
        return row;
      });
      setData(updatedData);
    };

  const helper=()=>{
    if(editCardVisible){
      setEditCardVisible(false)
    }
  }
  return (
    <div className='mainclass'>
      {editCardVisible && (
        <div  className="background-blur">
          <EditCard
            row={selectedRow}
            onClose={handleCloseEditCard}
            onSave={handleSaveEditCard}
          />
          <div className='abc' onClick={helper}></div>
        </div>
      )}
      <table>
        <thead>
          
        </thead>
        <tbody className='tablebody'>
        <tr className='tabler'>
            <td className='tabled h'><input checked={selectedRows.includes('0')} onChange={helper2} type="checkbox"/></td>
            
            <td className='tabled h'>Name</td>
            <td className='tabled h'>Email</td>
            <td className='tabled h'>Roles</td>
            <td className='tabled h'>Actions</td>
          </tr>
          {currentData.map((row) => (
            <tr className='tabler' key={row.id}>
              <td className='tabled'>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => onSelectRow(row.id)}
                />
              </td>
              
              <td className='tabled'>{row.name}</td>
              <td className='tabled'>{row.email}</td>
              <td className='tabled'>{row.role}</td>
              <td className='tabled'>
                <button className='btn btn1' onClick={() => handleEditRow(row)}><FaRegEdit className='btnx' /></button>
                <button className='btn btn2' onClick={() => onDeleteRow(row.id)}><AiFillDelete className='btnx' /></button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Implement pagination buttons */}
      <div className='bottom'>
        <button disabled={currentPage===1} className={`btn4`} onClick={() => onPagination(1)}>< MdKeyboardDoubleArrowLeft /></button>
        <button disabled={currentPage===1} className={`btny`} onClick={() => onPagination(currentPage - 1)}><GrFormPrevious /></button>
        <span className='btny'>{currentPage}</span>
        <button disabled={currentPage===totalPage} className='btny' onClick={() => onPagination(currentPage + 1)}><MdNavigateNext /></button>
        <button disabled={currentPage===totalPage} className='btny' onClick={() => onPagination(Math.ceil(data.length / rowsPerPage))}>
        <MdKeyboardDoubleArrowRight />
        </button>
      </div>

      {/* Implement delete selected button */}
      {/* <button onClick={onDeleteSelected}>Delete Selected</button> */}
    </div>
  );
};

export default Table;
