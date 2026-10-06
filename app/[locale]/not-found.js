import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function NotFound() {
  return (
    <Container sx={{ py: { xs: 10, md: 16 } }}>
      <Stack sx={{ gap: 3, maxWidth: 560 }}>
        <Typography variant="overline" component="p">
          404
        </Typography>
        <Typography variant="h2" component="h1">
          Pagina asta nu există.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Linkul e greșit sau pagina a fost mutată. Întoarce-te la prima pagină.
        </Typography>
        <Stack direction="row">
          <Button variant="contained" color="primary" href="/">
            Înapoi acasă
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
