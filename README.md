heatmap is custom visualization for Aster AppCenter, is faster than original table view.  

Sample Query
```sql
drop table if exists public.heatmap
;
create table public.heatmap
(
 "observation/predict" varchar(10)
 ,setosa int
 ,versicolor int
 ,virginica int
)
distribute by replication
;
insert into public.heatmap values('setosa', 10, 0, 0);
insert into public.heatmap values('versicolor', 0, 9, 3);
insert into public.heatmap values('virginica', 0, 1, 7);

insert into app_center_visualizations (json) values (  
'{  
     "db_table_name": "public.heatmap",  
     "vizType": "heatmap",  
     "title": "Report by heatmap"  
}')
;
```
