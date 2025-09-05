import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosinstant, PROJECTS_URL } from "../../../../../utils/urls";
import styles from './projectData.module.css';

interface ProjectForm {
  title: string;
  description: string;
}

interface ProjectResponse {
  title: string;
  description: string;
}

export default function ProjectData() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm<ProjectForm>();
  
  const [fetching, setFetching] = useState(false); // loading state for fetching data
  const [saving, setSaving] = useState(false);     // loading state for form submission

  // Determine page mode
  const path = window.location.pathname;
  let mode: "create" | "edit" | "view" = "create";
  if (path.includes("/edit/")) mode = "edit";
  if (path.includes("/view/")) mode = "view";

  // Fetch project data in edit/view mode
  useEffect(() => {
    if ((mode === "edit" || mode === "view") && id) {
      const fetchProject = async () => {
        try {
          setFetching(true);
          const token = localStorage.getItem("token");
          const res = await axiosinstant.get<ProjectResponse>(
            PROJECTS_URL.VIEWPROJECT.replace("{id}", id),
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setValue("title", res.data?.title || "");
          setValue("description", res.data?.description || "");
        } catch (error) {
          toast.error("Failed to load project data");
        } finally {
          setFetching(false);
        }
      };
      fetchProject();
    } else if (mode === "create") {
      // Clear form for create mode
      setValue("title", "");
      setValue("description", "");
    }
  }, [mode, id, setValue]);

  // Handle form submission
  const onSubmit = async (data: ProjectForm) => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      if (mode === "create") {
        await axiosinstant.post(PROJECTS_URL.CREATEPROJECT, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Project created successfully!");
      } else if (mode === "edit" && id) {
        await axiosinstant.put(
          PROJECTS_URL.UPDATEPROJECT.replace("{id}", id),
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Project updated successfully!");
      }

      navigate("/dashboard/projects-list");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`d-flex justify-content-center align-items-start min-vh-100 ${styles.section}`}>
      <div className="w-100">
        {/* Title */}
        <div className="p-4 text-left rounded-top bg-white shadow-sm w-100">
          <h6
            className={styles.title}
            onClick={() => navigate("/dashboard/projects-list")}
          >
            View All Projects
          </h6>
          <h3>
            {mode === "create" && "Add a New Project"}
            {mode === "edit" && "Edit Project"}
            {mode === "view" && "View Project"}
          </h3>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 rounded-3 shadow-sm border-4 border-dark w-75 m-auto mt-5 bg-white"
        >
          <div className="mb-3">
            <label className={styles.text}>Title</label>
            <input
              {...register("title")}
              className={styles.input}
              placeholder="Title"
              disabled={mode === "view" || fetching || saving}
            />
          </div>

          <div className="mb-3">
            <label className={styles.text}>Description</label>
            <textarea
              {...register("description")}
              className={styles.textarea}
              disabled={mode === "view" || fetching || saving}
              rows={4}
              placeholder="Description"
            />
          </div>

          <div className="d-flex justify-content-between mt-3">
            {/* Back/Cancel button */}
            <button
              type="button"
              className={styles.buttonCancel}
              onClick={() => navigate("/dashboard/projects-list")}
              disabled={saving || fetching}
            >
              {mode === "view" ? "Back to List" : "Cancel"}
            </button>

            {/* Save/Submit button only in create/edit */}
            {mode !== "view" && (
              <button type="submit" className={styles.buttonSave} disabled={saving || fetching}>
                {saving ? "Saving..." : "Save"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}