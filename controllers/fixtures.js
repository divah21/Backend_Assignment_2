
import axios from "axios";
import { API_SERVICE } from "../config/env.js";
import Fixture from "../models/Fixture.js";


export const getFixtures = async (req, res) => {
  try {
    const response = await axios.get(`${API_SERVICE}`);

    res.status(200).json(response.data);
  } catch (error) {

    const status = error.response?.status || 500;
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      "Internal server error";

    return res.status(status).json({
      success: false,
      message,
    });
  }
};

export const dumpFixtures = async (req, res) => {
  try {
    const response = await axios.get(`${API_SERVICE}`);
    const fixtures = response.data;

    if (!Array.isArray(fixtures)) {
      return res.status(400).json({ success: false, message: "Invalid fixtures data format" });
    }


    for (const fixture of fixtures) {
      await Fixture.upsert({
        id: fixture.id,
        code: fixture.code,
        event: fixture.event,
        finished: fixture.finished,
        finished_provisional: fixture.finished_provisional,
        kickoff_time: fixture.kickoff_time,
        minutes: fixture.minutes,
        provisional_start_time: fixture.provisional_start_time,
        started: fixture.started,
        team_a: fixture.team_a,
        team_a_score: fixture.team_a_score,
        team_h: fixture.team_h,
        team_h_score: fixture.team_h_score,
        stats: fixture.stats,
      });
    }

    res.status(200).json({ success: true, message: "Fixtures dumped to database" });
  } catch (error) {
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      "Internal server error";

    return res.status(status).json({
      success: false,
      message,
    });
  }
};
