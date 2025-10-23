// controllers/formController.js
import { Form } from "../models/Form.js";
import { Question } from "../models/Question.js";

export const formController = {
  async createForm(req, res) {
    try {
      const { title, description, allow_unauthenticated, questions } = req.body;

      //  U ovoj verziji još nema autentikacije, pa hardcodujemo userId
      const userId = 1;

      const form = await Form.create({
        title,
        description,
        allow_unauthenticated: !!allow_unauthenticated,
        created_by: userId,
      });

      if (questions?.length > 0) {
        const questionsWithFormId = questions.map((q, index) => ({
          form_id: form.id,
          text: q.text,
          type: q.type,
          is_required: q.is_required || false,
          options: q.options || [],
          order_index: index,
        }));
        await Question.createBatch(questionsWithFormId);
      }

      res.status(201).json({
        message: "Form created successfully",
        form: {
          id: form.id,
          title: form.title,
          description: form.description,
          allow_unauthenticated: form.allow_unauthenticated,
        },
        questions: questions || [],
      });
    } catch (error) {
      console.error("Create form error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getForm(req, res) {
    try {
      const formId = req.params.id;
      const form = await Form.findById(formId);
      if (!form) return res.status(404).json({ error: "Form not found" });

      const questions = await Question.findByFormId(formId);
      res.json({ ...form, questions });
    } catch (error) {
      console.error("Get form error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getUserForms(req, res) {
    try {
      //  Hardcoded userId jer još nema auth
      const userId = 1;
      const forms = await Form.findByUser(userId);
      res.json({ forms });
    } catch (error) {
      console.error("Get user forms error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateForm(req, res) {
    try {
      const formId = req.params.id;
      const updates = req.body;

      await Form.update(formId, updates);
      const updatedForm = await Form.findById(formId);
      res.json({ message: "Form updated successfully", form: updatedForm });
    } catch (error) {
      console.error("Update form error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteForm(req, res) {
    try {
      const formId = req.params.id;
      await Form.delete(formId);
      res.json({ message: "Form deleted successfully" });
    } catch (error) {
      console.error("Delete form error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
