import React from 'react';

const Table = ({ headers, data, className = '' }) => {
  return (
    <div className={`overflow-x-auto rounded-xl border border-base-200 ${className}`}>
      <table className="table table-zebra w-full">
        <thead>
          <tr className="bg-base-200">
            {headers.map((header, idx) => (
              <th key={idx} className="text-base-content font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {Object.values(row).map((cell, cellIdx) => (
                <td key={cellIdx} className="py-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;