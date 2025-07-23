import React, { useState } from "react";
import apiClient from "../../client/ApiClient";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CreateChecklist() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      Swal.fire("Nama kosong", "Silakan masukkan nama checklist", "warning");
      return;
    }

    try {
      const response = await apiClient.post("/checklist", { name });

      //   console.log(response.data?.statusCode);

      if (response.data?.statusCode === 2000) {
        setName("");

        Swal.fire({
          title: response?.data?.message || "Akun anda berhasil di registrasi",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        console.log("response", response);

        setTimeout(() => {
          navigate("/list-checklist");
        }, 2000);
      }
    } catch (error) {
      console.error("asa", error);

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
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Buat Checklist Baru
      </h2>
      <form onSubmit={handleCreate}>
        <label className="block mb-2 text-sm font-medium">Nama Checklist</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-md mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contoh: Belanja Mingguan"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}

export default CreateChecklist;
