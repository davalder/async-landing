const VIDEOAPIONEPIECE = "https://one-piece-episodes.p.rapidapi.com/one_piece";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-host": "one-piece-episodes.p.rapidapi.com",
    "x-rapidapi-key": "7c26f13dc8mshc903556a431e22bp142f76jsn42cc75351d46",
  },
};

const content = null || document.getElementById("content");

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const seasons = await fetchData(`${VIDEOAPIONEPIECE}/seasons?language=es`);

    const episodesBySeasons = await fetchData(
      `${VIDEOAPIONEPIECE}/episodes_by_season/${seasons.seasons[0].id}?language=es`
    );
    console.log(episodesBySeasons);
    let view = `
    ${episodesBySeasons.episodes
      .map(
        (video) =>
          `
            <div class="group relative">
                <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                  <img src="${video.image}" alt="${video.title}" class="w-full" />
                </div>
                <div class="mt-4 flex justify-between">
                  <h3 class="text-sm text-gray-700">
                    <a href="${video.url}" target="_blank">
                      <span aria-hidden="true" class="absolute inset-0"></span>
                      ${video.title}
                    </a>
                  </h3>
                </div>
            </div>
          `
      )
      .slice(0, episodesBySeasons.episodes.lenth)
      .join("")}
    `;
    content.innerHTML = view;
  } catch (error) {
    console.log(error);
  }
})();
