import { Helius } from 'helius-sdk';

export async function getCollection() {
	const storedData = localStorage.getItem('nftData');

	if (storedData !== null) {
		return JSON.parse(storedData);
	}
	let results = [];
	let page = 1;
		try {
            const helius = new Helius('2ee657db-a88e-4bc2-9470-61b5c328b310');
			const response = await helius.rpc.getAssetsByGroup({
				groupKey: 'collection',
				groupValue: '8Rt3Ayqth4DAiPnW9MDFi63TiQJHmohfTWLMQFHi4KZH',
				page: 1,
			});
			const nfts = response.items;
			// if the amount of items returned is less than 1000, stop pagination
			if (nfts.length < 1000) {
			} else {
				// otherwise, increase the page number to get the next page of results
				page++;
			}
			for (const nft of nfts) {
				const name = nft.content?.metadata.name;
				const description = nft.content?.metadata.description;
				const image = nft.content?.links?.image;

                results.push({ name, image, description});
			}
			localStorage.setItem('nftData', JSON.stringify(results));
			return results;
		} catch (e) {
			console.log(e);
		}
	}

