import React, { useEffect, useState } from "react";
import apiClient from "../../client/ApiClient";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ListChecklist() {
  const [checklists, setChecklists] = useState([]);
  const navigate = useNavigate();

  const getChecklists = async () => {
    try {
      const response = await apiClient.get("/checklist");

      if (response?.data?.statusCode === 2100) {
        setChecklists(response.data?.data);
      } else {
        setChecklists([]);
      }
    } catch (err) {
      console.error("Gagal mengambil checklist:", err);
    }
  };

  const handleDelete = async (checklistId, itemId) => {
    const confirm = await Swal.fire({
      title: "Yakin ingin menghapus checklist ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
    });

    if (confirm.isConfirmed) {
      try {
        await apiClient.delete(`/checklist/${checklistId}/item/${itemId}`);
        Swal.fire("Terhapus!", "Checklist berhasil dihapus.", "success");
        getChecklists(); // refresh
      } catch (error) {
        Swal.fire("Error", "Gagal menghapus checklist", "error");
      }
    }
  };

  useEffect(() => {
    getChecklists();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Daftar Checklist</h1>
        <button
          onClick={() => navigate("/list-checklist/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Tambah Checklist
        </button>
      </div>

      {checklists.length === 0 ? (
        <p className="text-gray-500">Belum ada checklist.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {checklists.map((checklist) => (
            <div key={checklist.id} className="p-4 border rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{checklist.name}</h3>
                <button
                  onClick={() => navigate(`/checklist/${checklist.id}/detail`)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Lihat Detail
                </button>
              </div>

              {Array.isArray(checklist.items) && checklist.items.length > 0 ? (
                <ul className="mt-2">
                  {checklist.items.map((item) => (
                    <li key={item.id} className="p-2 border rounded mb-1">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">{item.name}</p>
                        <button
                          onClick={() => handleDelete(checklist.id, item.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Hapus
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">Tidak ada item</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListChecklist;
