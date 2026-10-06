import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Reveal from "./Reveal";

export default function PageHeader({ eyebrow, title, lead }) {
  return (
    <Container sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 5, md: 8 } }}>
      <Reveal
        sx={{ display: "flex", flexDirection: "column", gap: { xs: 2.5, md: 3 }, maxWidth: 760 }}
      >
        <Typography variant="overline" component="p">
          {eyebrow}
        </Typography>
        <Typography variant="h1" component="h1" sx={{ textWrap: "balance" }}>
          {title}
        </Typography>
        {lead && (
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "52ch" }}>
            {lead}
          </Typography>
        )}
      </Reveal>
    </Container>
  );
}
