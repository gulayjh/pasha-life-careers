Ana səhifədə qaimələrin siyahısı verilmişdir. Səhifənin komponentləri MUI library-dən istifadə olunaraq qurulmuşdur.
Qaimələr səhifəsində axtarış və filter funksionallığı mövcuddur. 
Proyektdə istifadə olunan data mockaroo.com səhifəsi vasitəsilə generasiya olunub və Mockup API üçün json-server pluginindən istifadə olunub.
Mockup API ilə əlaqəni yaratmaq üçün 3001 nömrəli portdan istifadə olunub, aktiv etmək üçün:

     npx json-server --watch data/db.json --port 3001

Səhifədə istifadə olunan data üçün aşağıdakı endpoint-ler axios vasitəsilə istifadə olunub:
/invoices,
/invoices/id

Qaimələr səhifəsinə yeni qaimə əlavə etmək üçün Modal açılır, bu zaman
/customers, /goods endpoint-leri ilə yüklənən müştəri və məhsul siyahısından qaimə yazılacaq müştəri və məhsul seçilir.
Daha sonra lazım olan qədər məhsul əlavə etmək üçün məhsulun sayı artırıla bilər, bu halda məhsulun sayı limitdir,
uyğun saydan artıq seçilə bilmir. Lazım gəldikdə əlavə olunan mal silinə bilər. 
Daha sonra qaimə əlavə olunduqda figma faylında göstərilən designdakı modal açılacaqdır.
Digər əməliyyatların uğurlu olduğunu bildirmək və error mesajları üçün isə MUI library-nin Snackbar elementi istifadə olunub.

Qaimələr səhifəsindəki məlumatları dəyişmək və silmək üçün put və delete methodları istifadə olunub.
Siyahıdakı əmrlər bölməsindən seçilən qaimənin statusu dəyişilə bilər.#   p a s h a - l i f e - c a r e e r s  
 