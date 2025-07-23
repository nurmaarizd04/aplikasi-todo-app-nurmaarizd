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

        setTimeout(() => {
          navigate("/list-checklist");
        }, 2000);
      }
    } catch (error) {
      console.error("error", error);

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
      <h2 className="text-2xl font-semibold mb-4 text-center font-poppins mb-10">
        Buat Checklist Baru
      </h2>
      <form onSubmit={handleCreate}>
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="peer w-full px-3 py-2 rounded-lg mb-4 block pb-2.5 pt-4 border bg-transparent border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 focus:outline-none focus:ring-0 focus:border-[#0062FF]  text-[14px] text-[#44444F]"
            placeholder="Contoh: Belanja Mingguan"
          />

          <div className="flex space-x-5">
            <button
              onClick={() => navigate("/list-checklist")}
              type="submit"
              className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
            >
              kembali
            </button>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateChecklist;
