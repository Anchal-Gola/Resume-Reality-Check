import axios from "axios";

const ARBEITNOW_API =
  "https://www.arbeitnow.com/api/job-board-api";

export const searchJobs = async (query) => {
  const searchTerm = String(query || "")
    .trim()
    .toLowerCase();

  if (!searchTerm) {
    return [];
  }

  const response = await axios.get(ARBEITNOW_API);

  const jobs = Array.isArray(response.data?.data)
    ? response.data.data
    : [];

  const filteredJobs = jobs
    .filter((job) => {
      const title = String(job?.title || "").toLowerCase();

      // Search ONLY job title.
      // Do not search the huge description.
      return title.includes(searchTerm);
    })
    .map((job) => ({
      id: job.slug || job.url || job.title,
      title: String(job.title || "").trim(),
      company: String(
        job.company_name || "Company"
      ).trim(),
      location: String(
        job.location || "Remote / Not specified"
      ).trim(),
      description: job.description || "",
      url: job.url || "",
    }))
    .filter((job) => job.title)
    .slice(0, 8);

  return filteredJobs;
};