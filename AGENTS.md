<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Define typography families through global font tokens and load remote fonts in the root head; this keeps typography consistent without remote CSS imports.
- Keep the confirmed menu in business.ts with stable service IDs, numeric amounts and durations; the price list and AI assistant consume the same data to prevent discrepancies.
- Keep EN/ES interface copy in a shared language provider, with translated service names alongside menu entries; switch after hydration and pass locale to recommendations to avoid mixed languages.
- Trigger barber entrance effects with IntersectionObserver but keep portraits visible by default; animation failures must never hide staff photos.
