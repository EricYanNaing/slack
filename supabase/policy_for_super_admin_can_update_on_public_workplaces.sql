create policy "SuperAdminCanUpdate" on "public"."workplaces" as permissive
for update
to public using ("super_admin" = auth.uid ())
