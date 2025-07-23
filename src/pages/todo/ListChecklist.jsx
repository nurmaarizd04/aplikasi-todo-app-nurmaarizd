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

  const handleDeleteList = async (checklistId) => {
    console.log(checklistId);

    const confirm = await Swal.fire({
      title: "Yakin ingin menghapus checklist ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
    });

    if (confirm.isConfirmed) {
      try {
        await apiClient.delete(`/checklist/${checklistId}`);
        Swal.fire("Terhapus!", "Checklist berhasil dihapus.", "success");
        getChecklists(); // refresh
      } catch (error) {
        Swal.fire("Error", "Gagal menghapus checklist", "error");
      }
    }
  };

  const handleToggleStatus = async (checklistId, itemId, currentStatus) => {
    try {
      const response = await apiClient.put(
        `/checklist/${checklistId}/item/${itemId}`,
        {
          itemCompletionStatus: !currentStatus, // <-- bisa: true jadi false, false jadi true
        }
      );

      if (response?.data?.statusCode === 2200) {
        Swal.fire({
          title: response?.data?.message || "Akun anda berhasil di registrasi",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        getChecklists();
      }

      // Update local state / refetch data
    } catch (error) {
      console.error("asa", error?.response?.data?.errorMessage);

      Swal.fire({
        title:
          error?.response?.data?.errorMessage ||
          "Terjadi Permasalahan saat registrasi",
        icon: "warning",
        draggable: true,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-12 font-poppins">
        Todo Apllication
      </h1>
      <div className="flex justify-between items-center mb-6 font-poppins">
        <h1 className="text-2xl font-bold text-gray-900">List Checklist</h1>
        <button
          onClick={() => navigate("/list-checklist/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Tambah Checklist
        </button>
      </div>

      {checklists.length === 0 ? (
        <p className="text-gray-500">Belum ada list todo list.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sh">
          {checklists.map((checklist) => (
            <div
              key={checklist.id}
              className="p-4 border rounded-md shadow font-roboto flex flex-col justify-between h-[300px]"
            >
              <div>
                <div className="flex justify-between items-center mb-7">
                  <h3 className="font-semibold text-md text-gray-700 capitalize ">
                    {checklist.name}
                  </h3>
                  <button
                    onClick={() =>
                      navigate(`/checklist/${checklist.id}/detail`)
                    }
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Lihat Detail
                  </button>
                </div>

                {Array.isArray(checklist.items) &&
                checklist.items.length > 0 ? (
                  <ul className="mt-2">
                    {checklist.items.map((item) => (
                      <li
                        key={item.id}
                        className="p-2 px-2 border rounded mb-2"
                      >
                        <div className="flex justify-between items-center space-x-8">
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={item?.itemCompletionStatus === true}
                                onChange={() =>
                                  handleToggleStatus(
                                    checklist.id,
                                    item.id,
                                    item.itemCompletionStatus
                                  )
                                }
                                className="w-4 h-4 accent-blue-500 cursor-pointer"
                              />
                              <p className="text-gray-800 font-normal text-sm capitalize">
                                {item.name}
                              </p>
                            </div>

                            <button
                              onClick={() =>
                                handleDelete(checklist.id, item.id)
                              }
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">Tidak ada item</p>
                )}
              </div>

              <div className="mt-auto pt-4">
                <button
                  onClick={() => handleDeleteList(checklist.id)}
                  className="text-white hover:bg-red-700 text-[14px] font-medium shadow-lg bg-red-500 px-10 py-2 rounded-sm"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListChecklist;
