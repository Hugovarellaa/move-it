const express = require("express");
const routes = express.Router();

const Job = {
  data: [
    {
      id: 1,
      name: "Pizzaria Guloso",
      "daily-hours": 2,
      "total-hours": 65,
      created_at: Date.now(),
    },
    {
      id: 2,
      name: "OneTwo Project",
      "daily-hours": 3,
      "total-hours": 47,
      created_at: Date.now(),
    },
  ],

  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map((job) => {
        const remaining = Job.services.remainingDays(job);
        const status = remaining <= 0 ? "done" : "progress";

        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data["value-hour"]),
        };
      });

      return res.render("index", { jobs: updatedJobs });
    },
    create(req, res) {
      return res.render("job");
    },
    save(req, res) {
      const lastId = Job.data[Job.data.length - 1]?.id || 1;

      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now(),
      });
      return res.redirect("/");
    },
    show(req, res) {
      const jobId = req.params.id;

      const job = Job.data.find((job) => Number(job.id) === Number(jobId));

      if (!job) {
        return res.send("job not found!");
      }

      job.budget = Job.services.calculateBudget(
        job,
        Profile.data["value-hour"]
      );

      return res.render("job-edit", { job });
    },
    update(req, res) {
      const jobId = req.params.id;

      const job = Job.data.find((job) => Number(job.id) === Number(jobId));

      if (!job) {
        return res.send("job not found!");
      }

      const updatedJob = {
        id: req.params.id,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now(),
      };

      Job.data = Job.data.map((job) => {
        if (Number(job.id) === Number(jobId)) {
          job = updatedJob;
        }
        return job;
      });
      return res.redirect("/job/" + jobId);
    },
    delete(req, res) {
      const jobId = req.params.id;

      Job.data = Job.data.filter((job) => Number(job.id) !== Number(jobId));

      return res.redirect("/");
    },
  },

  services: {
    //Calculo dos dias
    remainingDays(job) {
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

      const createdDate = new Date(job.created_at);
      const dueDay = createdDate.getDate() + Number(remainingDays);
      const dueDateInMs = createdDate.setDate(dueDay);

      const timeDiffInMs = dueDateInMs - Date.now();

      const dayInMs = 1000 * 60 * 60 * 24;
      const dayDiff = Math.floor(timeDiffInMs / dayInMs);

      return dayDiff;
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"],
  },
};

const Profile = {
  data: {
    name: "Hugo Alves Varella",
    avatar: "https://github.com/Hugovarellaa.png",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 6,
    "vacation-per-year": 4,
    "value-hour": 75,
  },
  controllers: {
    index(req, res) {
      return res.render("profile", { profile: Profile.data });
    },
    update(req, res) {
      //req.body para pega os dados
      const data = req.body;

      //Definir quantas semanas tem no ano: 52
      const weeksPerYear = 52;

      //Quantas semanas tem em 1 mes
      const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

      //Total de horas Trabalhanda por semana
      const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

      //Horas trabalhanda por mes de
      const monthTotalHours = weekTotalHours * weeksPerMonth;

      //Valor será da minha hora
      data["value-hour"] = data["monthly-budget"] / monthTotalHours;

      Profile.data = data;

      return res.redirect("/profile");
    },
  },
};

routes.get("/", Job.controllers.index);

routes.get("/job", Job.controllers.create);
routes.post("/job", Job.controllers.save);

routes.get("/job/:id", Job.controllers.show);
routes.post("/job/:id", Job.controllers.update);
routes.post("/job/delete/:id", Job.controllers.delete);

routes.get("/profile", Profile.controllers.index);
routes.post("/profile", Profile.controllers.update);

module.exports = routes;