"use client";

import { useMemo, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { palette } from "@/theme/palette";
import { createReservationSchema, fieldErrors } from "./reservationSchema";

// Labels sit above the fields rather than floating inside them: MUI positions a
// floating label from its own type scale, which this one does not follow, and a
// static label matches how the rest of the site labels things anyway.
const labelSx = {
  fontFamily: "var(--font-mono), ui-monospace, monospace",
  fontSize: 10,
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  color: "text.secondary",
};

const fieldSx = {
  // The square page-wide focus ring is switched off for form controls in
  // globals.css; focus shows here instead, as a thicker accent border that
  // follows the field's own corners.
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    backgroundColor: palette.ink,
    "& fieldset": {
      borderColor: palette.fieldLine,
      transition: "border-color 200ms ease, border-width 120ms ease",
    },
    "&:hover fieldset": { borderColor: palette.accentLine },
    "&:focus-within fieldset": {
      borderColor: palette.accent,
      borderWidth: 2,
    },
  },
  "& .MuiOutlinedInput-input": { fontSize: 15 },
};

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  date: "",
  time: "19:00",
  guests: "2",
  message: "",
};

function Field({ id, label, error, children }) {
  return (
    <Stack sx={{ gap: 1, minWidth: 0 }}>
      <Box component="label" htmlFor={id} sx={labelSx}>
        {label}
      </Box>
      {children}
      {error && (
        <Typography
          id={`${id}-error`}
          variant="body2"
          sx={{ fontSize: 13, color: palette.warning }}
        >
          {error}
        </Typography>
      )}
    </Stack>
  );
}

export default function ReservationForm({ labels, slots, sizes }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const dateRef = useRef(null);

  // The browser's own calendar button cannot be coloured, so globals.css hides
  // it and this one opens the same picker.
  function openCalendar() {
    const input = dateRef.current;
    if (!input) return;
    if (typeof input.showPicker === "function") {
      input.showPicker();
    } else {
      input.focus();
    }
  }

  const schema = useMemo(
    () => createReservationSchema({ messages: labels.errors, slots, sizes }),
    [labels.errors, slots, sizes],
  );

  const update = (field) => (event) => {
    const { value } = event.target;
    setSent(false);
    // Clear this field's complaint as soon as it is being edited; the others
    // stay until the next submit, so the list does not jump around.
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setForm((current) => ({ ...current, [field]: value }));
  };

  function handleSubmit(event) {
    event.preventDefault();

    const result = schema.safeParse(form);

    if (!result.success) {
      setErrors(fieldErrors(result.error));
      return;
    }

    setErrors({});

    // Nothing leaves the browser: this is a demo site. A real booking would
    // post to app/api/<name>/route.js, which validates again and sends the mail.
    setSent(true);
  }

  return (
    <Stack
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        gap: 2.5,
        p: { xs: 3, md: 4.5 },
        borderRadius: "26px",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: palette.gloss,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gap: 2.5,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
        }}
      >
        <Field id="booking-name" label={labels.name} error={errors.name}>
          <TextField
            id="booking-name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "booking-name-error" : undefined}
            value={form.name}
            onChange={update("name")}
            sx={fieldSx}
            fullWidth
          />
        </Field>

        <Field id="booking-phone" label={labels.phone} error={errors.phone}>
          <TextField
            id="booking-phone"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "booking-phone-error" : undefined}
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            sx={fieldSx}
            fullWidth
          />
        </Field>

        <Field id="booking-email" label={labels.email} error={errors.email}>
          <TextField
            id="booking-email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "booking-email-error" : undefined}
            type="email"
            value={form.email}
            onChange={update("email")}
            sx={fieldSx}
            fullWidth
          />
        </Field>

        <Field id="booking-date" label={labels.date} error={errors.date}>
          <TextField
            id="booking-date"
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? "booking-date-error" : undefined}
            type="date"
            inputRef={dateRef}
            value={form.date}
            onChange={update("date")}
            sx={fieldSx}
            fullWidth
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={openCalendar}
                      aria-label={labels.openCalendar}
                      size="small"
                      sx={{ color: palette.accent }}
                    >
                      <Box
                        component="svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        sx={{ width: 19 }}
                      >
                        <rect
                          x="3.5"
                          y="5"
                          width="17"
                          height="15"
                          rx="3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M3.5 10h17M8.5 3v4M15.5 3v4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </Box>
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Field>

        <Field id="booking-time" label={labels.time} error={errors.time}>
          <TextField
            id="booking-time"
            aria-invalid={Boolean(errors.time)}
            aria-describedby={errors.time ? "booking-time-error" : undefined}
            select
            value={form.time}
            onChange={update("time")}
            sx={fieldSx}
            fullWidth
          >
            {slots.map((slot) => (
              <MenuItem key={slot} value={slot}>
                {slot}
              </MenuItem>
            ))}
          </TextField>
        </Field>

        <Field id="booking-guests" label={labels.guests} error={errors.guests}>
          <TextField
            id="booking-guests"
            aria-invalid={Boolean(errors.guests)}
            aria-describedby={
              errors.guests ? "booking-guests-error" : undefined
            }
            select
            value={form.guests}
            onChange={update("guests")}
            sx={fieldSx}
            fullWidth
          >
            {sizes.map((size) => (
              <MenuItem key={size} value={String(size)}>
                {size}
              </MenuItem>
            ))}
          </TextField>
        </Field>
      </Box>

      <Field id="booking-message" label={labels.message} error={errors.message}>
        <TextField
          id="booking-message"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "booking-message-error" : undefined
          }
          placeholder={labels.messagePlaceholder}
          value={form.message}
          onChange={update("message")}
          multiline
          rows={3}
          sx={fieldSx}
          fullWidth
        />
      </Field>

      {sent && (
        <Stack
          aria-live="polite"
          direction="row"
          sx={{
            gap: 1.75,
            p: 2.5,
            borderRadius: "16px",
            border: "1px solid",
            borderColor: palette.accentLine,
            backgroundColor: palette.accentFill,
          }}
        >
          <Box
            component="svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            sx={{
              width: 20,
              flex: "0 0 20px",
              mt: "2px",
              color: palette.accent,
            }}
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M12 7.5v6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16.6" r="1" fill="currentColor" />
          </Box>
          <Typography variant="body2" sx={{ color: palette.bone }}>
            {labels.demoNotice}
          </Typography>
        </Stack>
      )}

      <Stack direction="row" sx={{ justifyContent: "flex-end", pt: 1 }}>
        <Button type="submit" variant="contained" color="primary">
          {labels.submit}
        </Button>
      </Stack>
    </Stack>
  );
}
